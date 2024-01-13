CREATE TABLE `items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`quantity` integer NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`bestBefore` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `nameIndex` ON `items` (`name`);