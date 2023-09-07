
DROP SCHEMA IF EXISTS `starry-accessory`;

CREATE SCHEMA `starry-accessory`;
USE `starry-accessory` ;


CREATE TABLE IF NOT EXISTS `starry-accessory`.`product` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(1500) DEFAULT NULL,
  `unit_price` DECIMAL(13,2) DEFAULT NULL,
  `stock` INT(11) DEFAULT NULL,
  `available_stock` INT(11) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,  
  `category` VARCHAR(20) NOT NULL,
  `date_created` DATETIME(6) DEFAULT NULL,

  PRIMARY KEY (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Black Beauty',
"Black Beauty exude elegance and mystique in a single accessory. Crafted with meticulous attention, these earrings boast a captivating contrast between deep ebony gemstones and intricate metalwork. 
The onyx black stones, set against polished silver/gold, create a mesmerizing interplay of light and shadow. Whether it's a formal event or a night out, the Black Beauty earrings make a statement, adding an aura of sophistication to any ensemble. 
Their timeless design ensures they remain a versatile choice for both contemporary and classic styles, making them an essential addition to any jewelry collection.",
19.99, 5,5,'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/8ivp4fje1eyba4ngr4voz8b1m5ua', 'Now Trending', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Blue Butterfly',
"Graceful and enchanting, the Blue Butterfly earrings capture the delicate allure of nature's most vibrant flyers. 
Crafted with intricate detail, their cobalt blue wings are adorned with shimmering accents that dance in the light, invoking a sense of freedom and whimsy. 
These earrings effortlessly transform any outfit into a mesmerizing display of elegance and fascination, making them a must-have for those who appreciate the beauty of the natural world.",
19.99, 5,5,'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/3h938ouzysihf7cqcs33r6xq6gqt', 'Best Sellers', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Blue Jelly',
"The Blue Jelly earrings are a playful and imaginative accessory, reminiscent of underwater wonders. Their translucent blue hues resemble the captivating shades of the ocean's depths. 
With a unique gel-like texture, these earrings evoke a sense of fluidity and movement. Whether worn casually or to make a statement, they add a touch of intrigue to your style, promising an unconventional and eye-catching look.",
20.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/75anfx2euhkmfz7ug91q2kahu4h2', 'Now Trending', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Candy Pop',
"Sweeten your style with the Candy Pop earrings. Bursting with vibrant colors reminiscent of your favorite candies, these earrings are a playful and energetic addition to any outfit. 
The dynamic arrangement of hues creates an eye-catching visual delight, while the dangling design adds a touch of movement and fun. Wear these earrings to infuse a dose of lighthearted joy into your look, making every day feel like a celebration.",
22.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/1f0w1dkdeb3vajeh1ppvxv2r69bc', 'New Arrivals', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Elegant Clouds',
"Elevate your elegance with the Elegant Clouds earrings. Their subtle, ethereal design captures the essence of drifting clouds on a serene sky. Crafted with a blend of sophistication and simplicity, these earrings exude a calming aura. The polished silver/gold frames encircle delicate white or light blue gemstones, reflecting light like sunlight filtering through clouds. 
A symbol of refined grace, these earrings complement various styles, making them a versatile choice for both formal occasions and everyday wear.",
19.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/fbjttrb30908sn03rg70wwzqdxzg', 'Best Sellers', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Fancy Fruit',
"Playful and unique, the Fancy Fruit earrings are a delightful accessory that adds a splash of color to your ensemble. With their intricate design and vividly colored gemstones, these earrings resemble a medley of exotic fruits. 
Each earring showcases a mix of hues, textures, and shapes, celebrating the beauty of nature's bounty. Wear these earrings to express your vibrant personality and to showcase your love for all things fresh and exciting.",
19.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/hjhqy96fhhb2upq49b2rd73ck8yx', 'Now Trending', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Glinting Fairy',
"Illuminate your look with the Glinting Fairy earrings, a dazzling accessory that embodies the enchantment of fantasy realms. These earrings feature delicate, glimmering elements that capture the essence of fairy dust and magic. 
Their intricate craftsmanship and subtle shine evoke a sense of wonder and mystique, making them an ideal choice for those who believe in the beauty of dreams and the allure of the unknown.",
18.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/tfgtmh2leakq4s9vhr1s0hkoom9j', 'Best Sellers', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Gold Dingding',
"The Gold Dingding earrings exude opulence and charm. Their golden tones radiate warmth and luxury, adding a touch of glamour to any outfit. With a design that balances simplicity and sophistication, these earrings can effortlessly transition from day to night. 
The gentle sway of the hanging elements creates a pleasing movement, ensuring you'll catch every admiring gaze with each step you take.",
19.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/3gdn5o6xshy8lbknyqomal3z0izd', 'Best Sellers', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Ice cookie',
"The Ice Cookie earrings are a blend of elegance and playfulness. With their frosty, translucent design and delicate detailing, they resemble delectable frozen treats. 
The combination of icy tones and charming accents creates an accessory that's both refreshing and stylish. These earrings are perfect for those who appreciate a touch of whimsy in their look while maintaining an air of sophistication.",
20.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/uvolqfkrg1cvataqlrad6lhfvk3l', 'Now Trending', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Maple Dream',
"Embrace the beauty of autumn with the Maple Dream earrings. These earrings capture the intricate details of maple leaves in their transitional colors. 
With their warm and earthy tones, they evoke a sense of coziness and nostalgia. The delicate veins of the leaves are meticulously recreated, and the combination of colors adds depth and vibrancy. Wear these earrings to symbolize change, growth, and the serene beauty of nature.",
19.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/c44zp57ie4s2davsxwm68h3kygc9', 'Now Trending', NOW());


INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Mystery',
"The Mystery earrings shroud your style in an air of intrigue and allure. With their enigmatic design, these earrings spark curiosity and fascination. 
Their sleek, minimalist form is accompanied by unexpected twists and turns, creating an accessory that invites contemplation and interpretation. Whether you're heading to a sophisticated event or embracing everyday enigma, these earrings are your perfect companion.",
19.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/gbzbyta2hi8w7bvoivbyu6cfzz1y', 'New Arrivals', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Pinky pearl',
"The Pinky Pearl earrings redefine elegance with a contemporary twist. Delicate pink pearls take center stage, exuding femininity and sophistication. Contrasted against modern metals, these earrings strike a harmonious balance between traditional and modern styles. 
The blush tones of the pearls add a soft and romantic touch, making these earrings a timeless choice for those who appreciate classic beauty with a hint of modern flair.",
19.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/mv8wu7rjegfv2xnduoqo8c4fhbkb', 'New Arrivals', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Raindrop',
"Capture the essence of a refreshing rain shower with the Raindrop earrings. These earrings feature gracefully elongated teardrop-shaped gems that mimic the beauty of glistening raindrops. The sparkling gems are delicately suspended, creating a sense of movement and fluidity. 
Whether you want to channel a calming rain-soaked atmosphere or simply add a touch of elegance, these earrings are a versatile accessory that complements a range of looks.",
18.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/u86vt5l7ihfsko3a08kewbk5tg7r', 'Best Sellers', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Spring Blossom',
"Embrace the beauty of blooming flowers with the Spring Blossom earrings. These earrings capture the intricate details and vibrant colors of petals in full bloom. 
With their dynamic design and refreshing hues, they exude a sense of renewal and vitality. Whether you're celebrating the arrival of spring or simply want to add a touch of nature's beauty to your style, these earrings are a delightful choice that embodies the spirit of growth and transformation.",
17.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/106iyx4ynrlvcxugubv5e0yjm5zx', 'Best Sellers', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Stardust',
"Illuminate your look with the Stardust earrings, a celestial-inspired accessory that captures the magic of the cosmos. These earrings feature intricate patterns and shimmering accents that resemble the scattered stardust across the night sky. 
With their ethereal design and captivating sparkle, they evoke a sense of wonder and fascination. Wear these earrings to add a touch of cosmic enchantment to your style, symbolizing dreams, exploration, and the limitless possibilities of the universe.",
20.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/mj3sv3t41dafm3m69em0v6x9448b', 'Best Sellers', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Under the Sea',
"Dive into a world of enchantment with the Under the Sea earrings. These earrings encapsulate the mesmerizing beauty of the ocean's depths, featuring a palette of oceanic blues and aquatic greens. 
The intricate design mimics the fluid movement of underwater life, creating a dynamic and captivating accessory. Whether you're a lover of marine wonders or simply want to add a splash of intrigue to your look, these earrings evoke the mysteries and allure of the deep sea.",
22.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/owjf5p4wqp9oisnebiudfe6wp3dv', 'New Arrivals', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Upside-down Tulip',
"Embrace an unconventional and artistic flair with the Upside-Down Tulip earrings. These earrings play with perspective and form, featuring delicately crafted tulip blooms that appear to defy gravity. 
With their whimsical design and intricate details, they capture attention and spark conversation. These earrings are perfect for those who appreciate unique and thought-provoking accessories that challenge traditional norms and celebrate individuality.",
17.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/kj56xho6ypybvel5jag9j4bt1pwn', 'Best Sellers', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('White Daisy',
"Embrace the purity and simplicity of nature with the White Daisy earrings. These earrings capture the essence of delicate daisy flowers in full bloom. 
With their pristine white hues and intricate petal details, they evoke a sense of innocence and charm. The timeless design of these earrings makes them a versatile accessory that complements various styles, whether you're looking for a touch",
17.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/jm8fomri9ndst4gjgozhdr56fj3a', 'Now Trending', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Silver Star',
" Elevate your celestial style with the Silver Star earrings. These earrings capture the allure of the night sky, featuring delicately crafted silver stars that shimmer with every movement. The intricate details and polished finish evoke a sense of elegance and wonder. 
Whether you're aiming for a touch of cosmic charm or want to make a statement with stellar beauty, these earrings are a versatile choice that brings a touch of the universe's brilliance to your look.",
17.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/ch1nqy6v6mh7volqj18pqhm29ej3', 'New Arrivals', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Miss Macau',
" Embrace the exotic allure of Macau with the Miss Macau earrings. These earrings draw inspiration from the vibrant culture and rich history of the city, featuring intricate patterns and hues reminiscent of its unique architecture and artistic traditions. 
The dynamic design and vivid colors evoke a sense of wanderlust and adventure. Wear these earrings to channel the spirit of Macau's enchanting blend of tradition and modernity, adding an intriguing and cultural touch to your style.",
17.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/ixmbcr20ouy7a2p6ysih9qkd6rot', 'New Arrivals', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Autumn vibe',
" Embrace the warmth and beauty of the changing seasons with the Autumn Vibe earrings. These earrings capture the essence of fall's rich colors and rustic charm, featuring intricate details reminiscent of fallen leaves and cozy evenings. The earthy tones and delicate design evoke a sense of nostalgia and comfort. 
Whether you're strolling through colorful foliage or simply seeking to infuse your style with the magic of autumn, these earrings are the perfect accessory to celebrate nature's palette.",
17.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/8hgmpikd0we3i5uwm1lnl48cb8ie', 'Now Trending', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Calm',
" Find serenity in your style with the Calm earrings. These earrings exude a soothing aura, featuring a minimalist design that emphasizes tranquility and balance. The clean lines and subtle curves create a sense of harmony, allowing you to carry a piece of calmness with you wherever you go. 
Whether you're navigating a busy day or seeking a moment of quiet contemplation, these earrings serve as a gentle reminder to find peace within yourself.",
17.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/m3hm02q2mcsycttqx80d4tu0gaun', 'Best Sellers', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Key to soul',
" Unlock your innermost self with the Key to Soul earrings. These earrings symbolize self-discovery and personal growth, featuring a key motif that represents the journey to understanding one's essence. The intricate details and thoughtful design evoke a sense of mystery and exploration. 
Wear these earrings as a reminder of the importance of introspection and embracing the unique qualities that make you who you are – your true 'key' to the soul.",
17.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/2kslto6ax2wt7i78n5qe3h9ffkqg', 'Now Trending', NOW());

INSERT INTO product (name, description,  unit_price, stock, available_stock, image_url, category, date_created)
VALUES ('Show yourshell',
" Embrace your individuality with the Show YourShell earrings. These earrings celebrate the beauty of self-expression, featuring a unique and artistic design reminiscent of seashells' intricate patterns. With their whimsical details and unexpected twists, they encourage you to boldly display your inner creativity. 
Wear these earrings to showcase your distinctive style and to remind yourself and others of the remarkable beauty that comes from embracing your true self.",
17.99,5,5, 'https://res.cloudinary.com/duq6yxlzy/image/upload/c_fill/v1/production/plmtc5gazqx738bxygnxi9ncyzrg', 'Best Sellers', NOW());


USE `starry-accessory`;


SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `order_item`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `address`;
SET FOREIGN_KEY_CHECKS=1;

--
-- Table structure for table `address`
--
CREATE TABLE `address` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `customer`
--
CREATE TABLE `customer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `orders`
--
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_tracking_number` varchar(255) DEFAULT NULL,
  `total_price` decimal(19,2) DEFAULT NULL,
  `total_quantity` int DEFAULT NULL,
  `billing_address_id` bigint DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  `shipping_address_id` bigint DEFAULT NULL,
  `status` varchar(128) DEFAULT NULL,
  `date_created` datetime(6) DEFAULT NULL,
  `last_updated` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_billing_address_id` (`billing_address_id`),
  UNIQUE KEY `UK_shipping_address_id` (`shipping_address_id`),
  KEY `K_customer_id` (`customer_id`),
  CONSTRAINT `FK_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `FK_billing_address_id` FOREIGN KEY (`billing_address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `FK_shipping_address_id` FOREIGN KEY (`shipping_address_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `order_items`
--
CREATE TABLE `order_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` decimal(19,2) DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `K_order_id` (`order_id`),
  CONSTRAINT `FK_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FK_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



    

ALTER USER 'amy'@'localhost' IDENTIFIED WITH mysql_native_password BY 'amy';