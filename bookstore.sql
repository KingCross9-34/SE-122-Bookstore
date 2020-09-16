
CREATE TABLE chart 
(
    id              INTEGER NOT NULL auto_increment,    
    userid          INTEGER NOT NULL,
    bookid          INTEGER NOT NULL,
    num             INTEGER NOT null,
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (bookid) REFERENCES books(id) ON DELETE CASCADE
)

create table users
	(id		        integer NOT NULL auto_increment,
	 username		varchar(30) NOT NULL,
	 passwords		varchar(30) NOT NULL,
     nickname       varchar(20),
     authority      integer NOT NULL,
     prohibited     bool not null,
     email          varchar(30),
     account        integer not null,
     primary KEY (id)
	);

create table books
	(id		        integer NOT NULL auto_increment,
     ISBN           varchar(30) not null,
	 bookname		varchar(50) not null,
	 author		    varchar(30) not null,
     languages      varchar(20) not null,
     years          varchar(20),
     price          integer not null,
     details        varchar(255),
     images         varchar(255),
     stock          integer not null,
     publication    varchar(50),
     primary key (id)
	);

create table orders
    (id             integer not null auto_increment,
     usersId        integer not null,
     ordertime      VARCHAR(30) not null,
     totals         integer not null,
     primary key (id),
     foreign key (usersId) references users(id) on delete cascade
    );

create table orderitems
(
    id              INTEGER not NULL auto_increment,
    ordersid        INTEGER not null,
    bookid          INTEGER not null,
    num             INTEGER not null,
    PRIMARY KEY (id),
    FOREIGN KEY (ordersid) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (bookid) REFERENCES books(id) ON DELETE CASCADE
);

-- DELETE FROM orderitems;
-- delete from orders;
-- delete from books;
-- delete from users;

-- insert into users values (1, '123', '123', 'Jack', 1, 0, "Jack@sjtu.edu.cn", 20000);
-- insert into users values (0, 'Harry', 'potter', 'Harry Potter', 1, 0, "Hogwatts@sjtu.edu.cn", 100000);
-- insert into users values (0, '12345', '12345', 'Tom', 1, 1, "Tom@sjtu.edu.cn", 10000);
-- insert into users values (0, 'administrator', 'administrator', 'Administrator', 2, 0, "Administrator@gmail.com", 56000);

-- -- insert into books values ();
-- -- insert into books values (2, "Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140", "Detail");
-- -- insert into books values (3, "Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107", "Detail");
-- -- insert into books values (4, "And Then There Were None", "Agatha Christie", "English", "1939", "100", "Detail");
-- -- insert into books values (5, "Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100", "Detail");
-- -- insert into books values (6, "The Hobbit", "J. R. R. Tolkien", "English", "1937", "100", "Detail");
-- -- insert into books values (7, "She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100", "Detail");

-- -- insert into orders values ( 1, 1);
-- -- insert into orders values ( 1, 6);
-- -- insert into orders values ( 1, 4);
-- -- insert into orders values ( 2, 3);