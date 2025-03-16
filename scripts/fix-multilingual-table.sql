-- Първо проверяваме дали функцията съществува и я изтриваме
DROP FUNCTION IF EXISTS get_countries_by_language(text);

-- Създаване на таблица за многоезичните данни за държавите (ако не съществува)
CREATE TABLE IF NOT EXISTS multilingual_countries (
  id SERIAL PRIMARY KEY,
  code VARCHAR(3) NOT NULL UNIQUE,
  name_en VARCHAR(100) NOT NULL,
  name_bg VARCHAR(100) NOT NULL,
  name_es VARCHAR(100) NOT NULL,
  capital_en VARCHAR(100) NOT NULL,
  capital_bg VARCHAR(100) NOT NULL,
  capital_es VARCHAR(100) NOT NULL,
  flag_url TEXT NOT NULL,
  contour_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Създаване на индекс за по-бързо търсене по код на държава
CREATE INDEX IF NOT EXISTS idx_multilingual_countries_code ON multilingual_countries (code);

-- Функция за извличане на държави на избрания език
CREATE OR REPLACE FUNCTION get_countries_by_language(lang TEXT)
RETURNS TABLE (
  id INTEGER,
  code VARCHAR(3),
  name VARCHAR(100),
  capital VARCHAR(100),
  flag_url TEXT,
  contour_url TEXT
) AS $$
BEGIN
  CASE lang
    WHEN 'bg' THEN
      RETURN QUERY SELECT
        mc.id,
        mc.code,
        mc.name_bg AS name,
        mc.capital_bg AS capital,
        mc.flag_url,
        mc.contour_url
      FROM
        multilingual_countries mc;
    WHEN 'es' THEN
      RETURN QUERY SELECT
        mc.id,
        mc.code,
        mc.name_es AS name,
        mc.capital_es AS capital,
        mc.flag_url,
        mc.contour_url
      FROM
        multilingual_countries mc;
    ELSE
      RETURN QUERY SELECT
        mc.id,
        mc.code,
        mc.name_en AS name,
        mc.capital_en AS capital,
        mc.flag_url,
        mc.contour_url
      FROM
        multilingual_countries mc;
  END CASE;
END;
$$ LANGUAGE plpgsql; 