enum status {
    active = "active",
    inactive = "inactive",
    deleted = "deleted"
}
export interface Users {
    id?: number
    rol: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
   created_at: Date;
   last_login: Date;
   status: status
   bio: string
   birth_date: Date
  }