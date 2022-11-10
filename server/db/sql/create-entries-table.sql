CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fromAddress TEXT NOT NULL,
    encryptedData TEXT NOT NULL,
    decryptedData TEXT NOT NULL,
    hash TEXT NOT NULL,
    nonce INTEGER NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
)