CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [DisplayName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirbaseUserId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Project] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] nvarchar(255) NOT NULL,
  [Deadline] date,
  [CategoryId] int,
  [UserId] int NOT NULL
)
GO

CREATE TABLE [Task] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Content] nvarchar(255) NOT NULL,
  [Deadline] date,
  [IsComplete] bit NOT NULL,
  [ProjectId] int NOT NULL
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ProjectTag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [ProjectId] int NOT NULL,
  [TagId] int NOT NULL
)
GO

ALTER TABLE [Project] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Task] ADD FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [ProjectTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Project] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [ProjectTag] ADD FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([Id]) ON DELETE CASCADE
GO
