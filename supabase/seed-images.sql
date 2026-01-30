-- PhotoPick Studio Images Seed Data
-- 78개 스튜디오 x 10장 = 780장 이미지

-- 기존 이미지 삭제
DELETE FROM studio_images;

-- 스튜디오별 이미지 추가 (picsum.photos 사용)
-- 각 스튜디오당 10장씩

DO $$
DECLARE
  studio_rec RECORD;
  img_index INT;
  seed_num INT := 1;
BEGIN
  FOR studio_rec IN SELECT id, name FROM studios ORDER BY created_at LOOP
    FOR img_index IN 1..10 LOOP
      INSERT INTO studio_images (studio_id, image_url, alt_text, sort_order, is_main)
      VALUES (
        studio_rec.id,
        'https://picsum.photos/seed/' || seed_num || '/800/600',
        studio_rec.name || ' 포트폴리오 ' || img_index,
        img_index,
        CASE WHEN img_index = 1 THEN TRUE ELSE FALSE END
      );
      seed_num := seed_num + 1;
    END LOOP;
  END LOOP;
END $$;

-- 결과 확인
SELECT
  s.name as studio_name,
  COUNT(si.id) as image_count
FROM studios s
LEFT JOIN studio_images si ON s.id = si.studio_id
GROUP BY s.id, s.name
ORDER BY s.name
LIMIT 20;
