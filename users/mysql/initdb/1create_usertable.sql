CREATE TABLE Users (
    User_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Full_name VARCHAR2(255) NOT NULL,
    Username VARCHAR2(255) NOT NULL,
    Email VARCHAR2(255) NOT NULL UNIQUE,
    Password_hash VARCHAR2(255) NOT NULL
);