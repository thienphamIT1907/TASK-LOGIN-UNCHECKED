drop database if exists user_role_login_db;
​
create database user_role_login_db;
use user_role_login_db;
​
create table user_role
(
    user_id int not null,
    role_id int not null
);
​
create table _user
(
    user_id      int primary key auto_increment,
    username     varchar(25)  not null,
    pass_word    varchar(16)  not null,
    full_name    varchar(50)  not null,
    email        varchar(55)  not null,
    address      varchar(255) not null,
    phone_number varchar(15)  not null
);
​
create table _role
(
    role_id   int primary key auto_increment,
    role_name varchar(50)
);
​
insert into _role(role_name)
values ('ROLE_ADMIN');
insert into _role(role_name)
values ('ROLE_MEMBER');
​
alter table user_role
    add constraint primary key (user_id, role_id),
    add constraint user_id foreign key (user_id) references _user (user_id),
    add constraint role_id foreign key (role_id) references _role (role_id);