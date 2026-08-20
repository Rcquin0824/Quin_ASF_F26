CREATE TABLE ref_user_role
(
    role_name VARCHAR(50) PRIMARY KEY
);
INSERT INTO ref_user_role
VALUES ('vendor'),
       ('buyer'),
       ('admin'),
       ('analyst'),
       ('moderator'),
       ('guest');

CREATE TABLE ref_account_status
(
    status_name VARCHAR(50) PRIMARY KEY
);
INSERT INTO ref_account_status
VALUES ('active'),
       ('locked'),
       ('suspended'),
       ('disabled'),
       ('pending');

CREATE TABLE ref_device_type
(
    device_name VARCHAR(50) PRIMARY KEY
);
INSERT INTO ref_device_type
VALUES ('desktop'),
       ('mobile'),
       ('tablet'),
       ('kiosk'),
       ('server');

CREATE TABLE ref_operating_system
(
    os_name VARCHAR(50) PRIMARY KEY
);
INSERT INTO ref_operating_system
VALUES ('Windows'),
       ('macOS'),
       ('Linux'),
       ('Android'),
       ('iOS');

CREATE TABLE ref_browser_name
(
    browser_name VARCHAR(50) PRIMARY KEY
);
INSERT INTO ref_browser_name
VALUES ('Chrome'),
       ('Firefox'),
       ('Edge'),
       ('Safari'),
       ('Tor');

CREATE TABLE ref_event_type
(
    event_type VARCHAR(50) PRIMARY KEY
);
INSERT INTO ref_event_type
VALUES ('login'),
       ('logout'),
       ('password_change'),
       ('purchase'),
       ('file_access'),
       ('account_update'),
       ('admin_action');

CREATE TABLE ref_event_category
(
    category_name VARCHAR(50) PRIMARY KEY
);
INSERT INTO ref_event_category
VALUES ('authentication'),
       ('transaction'),
       ('system'),
       ('user_management'),
       ('security');

CREATE TABLE ref_action_taken
(
    action_name VARCHAR(50) PRIMARY KEY
);
INSERT INTO ref_action_taken
VALUES ('allow'),
       ('deny'),
       ('block'),
       ('flag'),
       ('alert');

CREATE TABLE ref_status
(
    status_name VARCHAR(50) PRIMARY KEY
);
INSERT INTO ref_status
VALUES ('success'),
       ('failed'),
       ('blocked'),
       ('pending');

CREATE TABLE ref_severity
(
    severity_name VARCHAR(50) PRIMARY KEY
);
INSERT INTO ref_severity
VALUES ('low'),
       ('medium'),
       ('high'),
       ('critical');

CREATE TABLE ref_resource_type
(
    resource_name VARCHAR(50) PRIMARY KEY
);
INSERT INTO ref_resource_type
VALUES ('user_account'),
       ('product_listing'),
       ('transaction_record'),
       ('admin_panel'),
       ('file_storage'),
       ('api_endpoint');

CREATE TABLE ref_failure_reason
(
    reason_name VARCHAR(100) PRIMARY KEY
);
INSERT INTO ref_failure_reason
VALUES ('invalid_password'),
       ('invalid_username'),
       ('account_locked'),
       ('insufficient_permissions'),
       ('timeout'),
       ('suspicious_activity'),
       ('system_error');

CREATE TABLE security_logs_normalized
(
    log_id           SERIAL PRIMARY KEY,
    event_time       TIMESTAMP    NOT NULL,
    username         VARCHAR(100) NOT NULL,
    user_role        VARCHAR(50) REFERENCES ref_user_role (role_name),
    account_status   VARCHAR(50) REFERENCES ref_account_status (status_name),
    ip_address       VARCHAR(45)  NOT NULL,
    port_number      INT          NOT NULL,
    device_type      VARCHAR(50) REFERENCES ref_device_type (device_name),
    operating_system VARCHAR(50) REFERENCES ref_operating_system (os_name),
    browser_name     VARCHAR(50) REFERENCES ref_browser_name (browser_name),
    location_city    VARCHAR(100),
    location_region  VARCHAR(100),
    location_country VARCHAR(100),
    event_type       VARCHAR(50) REFERENCES ref_event_type (event_type),
    event_category   VARCHAR(50) REFERENCES ref_event_category (category_name),
    action_taken     VARCHAR(50) REFERENCES ref_action_taken (action_name),
    status           VARCHAR(50) REFERENCES ref_status (status_name),
    severity         VARCHAR(50) REFERENCES ref_severity (severity_name),
    resource_type    VARCHAR(50) REFERENCES ref_resource_type (resource_name),
    resource_name    VARCHAR(100),
    session_id       VARCHAR(100) NOT NULL,
    failure_reason   VARCHAR(100) REFERENCES ref_failure_reason (reason_name),
    risk_score       INT          NOT NULL,
    watchlist_flag   BOOLEAN      NOT NULL,
    notes            TEXT
);