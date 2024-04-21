import sqlite3
import time


class DBModel():

    def __init__(self, db_name: str, table_name: str, table_schema: str | None =None):
        """
        @params db_name: string takes the name of the database to connect to DB
        * In future will make it a singleton
        * Add features of orm in future
        * table_schema later on to be used to migrate tables
        """

        self.table = table_name
        self.dbname = db_name
        self.schema = table_schema

        try:
            self.con = sqlite3.connect(self.dbname, check_same_thread=False)
            self.cur = self.con.cursor()  # Cursor object to run transactions on the DB
            # self.createTable(tableName=table_name, tableQuery=table_schema)
        except sqlite3.Error as er:
            print(er)
            pass

    def insertOne(self, data: tuple) -> None:
        """
        @params table: string - table name to run on
        @params data: tuple - containing all the necessary columns
        * Will make for dynamic in future
        """
        dt_fillers = ','.join(['?' for _ in range(len(data))])
        query = f"INSERT INTO {self.table} VALUES ({dt_fillers})"
        print(query)
        self.cur.execute(query, data)
        self.con.commit()

        pass

    def insertMany(self, data: list[tuple]) -> None:
        self.cur.executemany(
            f"insert into {self.table} values ({'?,'*len(data[0])})", data)
        pass

    def createTable(self) -> None:
        """
        Creates a Table if doesnt exist
        """
        try:
            self.cur.execute(f"select * from {self.table}")
            pass
        except sqlite3.OperationalError:
            if(sqlite3.OperationalError):
                try:
                    print(f"Creating a new table: {self.table}")
                    self.cur.execute(self.schema)
                    self.con.commit()
                    print(
                        f"Table succesfully created with query: {self.schema}")
                except sqlite3.Error as e:
                    print(e)



# schema = "CREATE TABLE movie(title, year, score)"
# table_name = "movie"

# Contents = DBModel("IntelliDMS.db", "contents")
# Contents.createTable(table_name, schema)
# # Contents.cur.execute("select * from contents")
# Contents.insertOne(table_name, ("good boys", 2024, "average"))
# print(Contents.cur.fetchall())
