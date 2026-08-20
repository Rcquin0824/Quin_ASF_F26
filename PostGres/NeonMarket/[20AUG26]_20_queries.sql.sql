-- Query 1: Find all records where status is failed.
-- Why it matters: Identifies baseline error rates and potential brute-force or unauthorized attempts.
SELECT * FROM security_logs_normalized WHERE status = 'failed';

-- Query 2: Find all records where severity is high or critical.
-- Why it matters: Isolates events that pose immediate operational or systemic risk.
SELECT * FROM security_logs_normalized WHERE severity IN ('high', 'critical');

-- Query 3: Find all records where account_status is locked.
-- Why it matters: Locked profiles should remain inactive; activity here highlights persistence or bypass attempts.
SELECT * FROM security_logs_normalized WHERE account_status = 'locked';

-- Query 4: Find all records where watchlist_flag is true.
-- Why it matters: Focuses analysis on known entities requiring enhanced tracking.
SELECT * FROM security_logs_normalized WHERE watchlist_flag = TRUE;

-- Query 5: List all login events ordered by event_time.
-- Why it matters: Establishes a timeline to inspect user behaviors leading up to compromise.
SELECT * FROM security_logs_normalized WHERE event_type = 'login' ORDER BY event_time ASC;

-- Query 6: Find the top 10 records with the highest risk_score.
-- Why it matters: Pinpoints the single most dangerous operations or anomalous actions recorded.
SELECT * FROM security_logs_normalized ORDER BY risk_score DESC LIMIT 10;

-- Query 7: Count how many total records exist for each event_type.
-- Why it matters: Identifies operational trends and normal functional utilization.
SELECT event_type, COUNT(*) FROM security_logs_normalized GROUP BY event_type;

/*
 Medium Queries
 */

-- Query 8: Count how many failed events each username has.
-- Why it matters: Reveals targeted accounts undergoing credential stuffing or user error.
SELECT username, COUNT(*) FROM security_logs_normalized WHERE status = 'failed' GROUP BY username;

-- Query 9: Count how many records exist for each ip_address.
-- Why it matters: Detects heavy scanners, proxies, or high-volume automated bots.
SELECT ip_address, COUNT(*) FROM security_logs_normalized GROUP BY ip_address ORDER BY COUNT(*) DESC;

-- Query 10: Count how many high or critical events exist for each username.
-- Why it matters: Flags compromised or malicious internal user profiles.
SELECT username, COUNT(*) FROM security_logs_normalized WHERE severity IN ('high', 'critical') GROUP BY username;

-- Query 11: Count how many failed events exist for each device_type.
-- Why it matters: Highlights if mobile, desktop, or server endpoints face disproportionate errors.
SELECT device_type, COUNT(*) FROM security_logs_normalized WHERE status = 'failed' GROUP BY device_type;

-- Query 12: Count how many suspicious events exist for each location_country.
-- Why it matters: Identifies high-risk regions or unexpected international routing.
SELECT location_country, COUNT(*) FROM security_logs_normalized WHERE failure_reason = 'suspicious_activity' GROUP BY location_country;

-- Query 13: Find the most common failure_reason values.
-- Why it matters: Tells analysts whether blocks are due to bad passwords, permissions, or automated lockouts.
SELECT failure_reason, COUNT(*) FROM security_logs_normalized WHERE failure_reason IS NOT NULL GROUP BY failure_reason ORDER BY COUNT(*) DESC;

-- Query 14: Count how many records exist for each resource_type.
-- Why it matters: Shows which system assets (e.g., admin panels vs product listings) get probed most.
SELECT resource_type, COUNT(*) FROM security_logs_normalized GROUP BY resource_type;

-- Query 15: Count how many records exist for each user_role and event_category combination.
-- Why it matters: Detects privilege creep or functional misuse (e.g., guests performing transaction categories).
SELECT user_role, event_category, COUNT(*) FROM security_logs_normalized GROUP BY user_role, event_category;

/*
 Harder queries
 */

-- Query 16: Find ip_address values used by more than one username.
-- Why it matters: Exposes potential proxy usage, credential rotation, or multi-accounting operations.
SELECT ip_address FROM security_logs_normalized GROUP BY ip_address HAVING COUNT(DISTINCT username)>1;

-- Query 17: Find usernames with both failed events and high-risk events.
-- Why it matters: Correlates failed logins with subsequent severe risk behavior, signaling active compromise.
SELECT DISTINCT username FROM security_logs_normalized WHERE status = 'failed'
INTERSECT
SELECT DISTINCT username FROM security_logs_normalized WHERE severity IN ('high', 'critical');

-- Query 18: Find session_id values that contain multiple failed events.
-- Why it matters: Uncovers session-bound attacks or persistent functional malfunctions.
SELECT session_id FROM security_logs_normalized WHERE status = 'failed' GROUP BY session_id HAVING COUNT(*) > 1;

-- Query 19: Find accounts marked locked or suspended that still show successful activity.
-- Why it matters: A major security vulnerability indicating unauthorized access despite account suspension.
SELECT DISTINCT username, account_status FROM security_logs_normalized WHERE account_status IN ('locked', 'suspended') AND status = 'success';

-- Query 20: Find usernames, IP addresses, or sessions where multiple risk indicators appear together.
-- Why it matters: Isolates confirmed malicious actors triggering multi-layered security alerts.
SELECT username, ip_address, session_id, COUNT(*) as risk_indicators
FROM security_logs_normalized
WHERE status = 'failed' AND severity IN ('high', 'critical') AND watchlist_flag = TRUE AND risk_score > 75
GROUP BY username, ip_address, session_id;