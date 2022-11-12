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

db.runCommand({
  insert: 'cards',
  documents: [
    {
      name: 'Фьордленд',
      link: 'https://windows10spotlight.com/wp-content/uploads/2017/06/05ace914bf5751ec2d0b86368d07d692-1024x576.jpg',
      owner: '635edc8e38776faba385104e',
      likes: [],
      createdAt: '2022-11-06T16:16:02Z',
    },
    {
      name: 'Новая Зеландия',
      link: 'https://i.ytimg.com/vi/1ueX9zXIbXM/maxresdefault.jpg',
      owner: '635edc8e38776faba385104e',
      likes: [],
      createdAt: '2022-11-06T16:16:04Z',
    },
    {
      name: 'Залив Милфорд-саунд',
      link: 'https://wallbox.ru/resize/800x480/wallpapers/main2/201730/voda-pejzaz.jpg',
      owner: '635edc8e38776faba385104e',
      likes: [],
      createdAt: '2022-11-06T16:16:06Z',
    },
    {
      name: 'Окленд',
      link: 'https://getwalls.io/media/large/2020/02/auckland-wallpaper-in-4k-2020-large-1916546428.jpg',
      owner: '635edc8e38776faba385104e',
      likes: [],
      createdAt: '2022-11-06T16:16:08Z',
    },
    {
      name: 'Хоббитон',
      link: 'https://conceptodefinicion.de/wp-content/uploads/2017/06/Comarca2.jpg',
      owner: '635edc8e38776faba385104e',
      likes: [],
      createdAt: '2022-11-06T16:16:09Z',
    },
  ],
  bypassDocumentValidation: true,
});
