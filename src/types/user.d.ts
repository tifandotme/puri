type User = {
  firstName: string;
  lastName?: string;
  email: string;
  division: "logistik" | "sales";
};

type EditUserForm = Omit<User, "email" | "division">;

type UserList = Record<string, User>;
