const USERS = {
  alice: {
    username: "vilok",
    name: "Vilok Masuti. ",
    role: "Operations",
    modules: [
      { name: "Orders", permissions: ["VIEW", "CREATE"] },
      { name: "Billing", permissions: ["VIEW"] },
    ],
  },
  bob: {
    username: "Pooja",
    name: "Pooja Koli",
    role: "Support",
    modules: [{ name: "Orders", permissions: ["VIEW"] }],
  },
  admin: {
    username: "Vish",
    name: "Vish Raj",
    role: "Administrator",
    modules: [
      { name: "Orders", permissions: ["VIEW", "CREATE", "DELETE"] },
      { name: "Billing", permissions: ["VIEW", "CREATE"] },
      { name: "Reports", permissions: ["VIEW"] },
    ],
  },
};


// Exposes the safe account details shown on the demo login screen.
export const DEMO_USERS = Object.values(USERS).map((u) => ({
    username: u.username,
  name: u.name,
  role: u.role,


}))
// Resolves a demo username to a user after a short simulated network delay.
export function fetchUser(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const normalizedUsername = String(username).trim().toLowerCase();
      const user = Object.values(USERS).find(
        (candidate) => candidate.username.toLowerCase() === normalizedUsername
      );
      if (!user) {
        reject(new Error(`Unknown user "${username}"`));
        return;
      }
      resolve(user);
    }, 600);
  });
}
