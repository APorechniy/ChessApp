CREATE VIEW settings_view (id, name, logo, vkLink, email, phone, legalName, itin, ukassaId, ukassaApiKey, ukassaIsConnected) 
AS SELECT id, name, logo, vk_link, email, phone, legal_name, itin, ukassa_id, ukassa_api_key, ukassa_is_connected
FROM settings;