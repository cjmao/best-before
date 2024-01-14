CREATE TABLE `items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`quantity` integer NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`bestBefore` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `nameIndex` ON `items` (`name`);