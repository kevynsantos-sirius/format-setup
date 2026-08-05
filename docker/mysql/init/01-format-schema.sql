CREATE TABLE IF NOT EXISTS users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(150) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    PRIMARY KEY (id),
    CONSTRAINT uq_users_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS projects (
    id BIGINT NOT NULL AUTO_INCREMENT,
    uuid VARCHAR(36) NOT NULL,
    user_id BIGINT NOT NULL,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL DEFAULT 'WEB',
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    last_modified DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    version INT NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    CONSTRAINT uq_projects_uuid UNIQUE (uuid),
    INDEX idx_projects_user_id (user_id),
    CONSTRAINT fk_projects_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS processes (
    process_id VARCHAR(255) NOT NULL,
    status VARCHAR(255),
    created_at DATETIME(6),
    completed_at DATETIME(6),
    error_message VARCHAR(255),
    diagnostic_log LONGTEXT,
    diagnostic_path VARCHAR(255),
    command_line TEXT,
    exit_code INT,
    PRIMARY KEY (process_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS process_entity_generated_files (
    process_entity_process_id VARCHAR(255) NOT NULL,
    generated_files VARCHAR(255),
    INDEX idx_process_generated_files_process_id (process_entity_process_id),
    CONSTRAINT fk_process_generated_files_process
        FOREIGN KEY (process_entity_process_id) REFERENCES processes(process_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pdfs (
    id VARCHAR(255) NOT NULL,
    storage_filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    process_id VARCHAR(255) NOT NULL,
    size_bytes BIGINT NOT NULL,
    created_at DATETIME(6),
    PRIMARY KEY (id),
    INDEX idx_pdfs_process_id (process_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
