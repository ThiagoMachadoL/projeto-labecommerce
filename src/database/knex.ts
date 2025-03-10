import { knex } from "knex"

export const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./src/database/tabela1.db", 
    },
    useNullAsDefault: true, 
    pool: {
        min: 0, 
        max: 1,
				afterCreate: (conn: any, cb: any) => {
            conn.run("PRAGMA foreign_keys = ON", cb)
        } 
    }
})