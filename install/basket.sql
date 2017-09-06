-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 06 2017 г., 16:26
-- Версия сервера: 5.5.50
-- Версия PHP: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `Store`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Buy`
--

CREATE TABLE IF NOT EXISTS `Buy` (
  `id` int(11) NOT NULL,
  `id_Product` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Buy`
--

INSERT INTO `Buy` (`id`, `id_Product`, `quantity`) VALUES
(11, 3, 4),
(12, 1, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `Products`
--

CREATE TABLE IF NOT EXISTS `Products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `img` varchar(255) NOT NULL,
  `info` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `cost` float DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Products`
--

INSERT INTO `Products` (`id`, `name`, `img`, `info`, `status`, `quantity`, `cost`) VALUES
(1, 'Jacket', 'images/1.jpg', '56 size', 'In Stock', 1, 75.83),
(2, 'Pants', 'images/2.jpg', '54 size', 'In Stock', 1, 24.55),
(3, 'Pullover', 'images/3.jpg', '45 size', 'In Stock', 1, 31.25),
(4, 'High Neck Women’s', 'images/4.jpg', 'Coat', 'In Stock', 1, 25.78),
(5, 'BestBuy Men’s pant', 'images/5.jpg', '32 size', 'In Stock', 1, 40);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Buy`
--
ALTER TABLE `Buy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Product` (`id_Product`);

--
-- Индексы таблицы `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Buy`
--
ALTER TABLE `Buy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT для таблицы `Products`
--
ALTER TABLE `Products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Buy`
--
ALTER TABLE `Buy`
  ADD CONSTRAINT `buy_ibfk_1` FOREIGN KEY (`id_Product`) REFERENCES `Products` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
