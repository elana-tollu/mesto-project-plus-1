db.createUser(
  {
    user: 'mesto_user',
    pwd: 'mesto_password',
    roles: [
      {
        role: 'readWrite',
        db: 'mestodb',
      },
    ],
  },
);
db.createCollection('users');
db.createCollection('cards');

db.runCommand({
  insert: 'users',
  documents: [
    { name: 'Elana', about: 'cat', avatar: 'https://101kote.ru/upload/medialibrary/46f/20.jpg' },
    { name: 'Ilia', about: 'mouse', avatar: 'https://pbs.twimg.com/media/Ey3aPyrXEAA-W8P?format=jpg&name=large' },
    { name: 'Evgenia', about: 'croco', avatar: 'https://i.pinimg.com/736x/27/29/80/27298094a0cc579fd32e559d54b8af61.jpg' },
  ],
  bypassDocumentValidation: true,
});
