const bellyPictures = require('../Assets/bellyPictures.json');
const voreBellyImages = require('../Assets/voreBellyPictures.json');
const pregnantPictures = require('../Assets/pregnantPictures.json');

function getRandomImage(images) {
  return images[Math.floor(Math.random() * images.length)].url;
}

function getImageByTag(images, tag) {
  const filtered = images.filter(img => img.tags.includes(tag));
  return filtered.length > 0 ? getRandomImage(filtered.map(i => ({ url: i.url }))) : null;
}

function getImageByCategory(category) {
  const source =
    category === 'vore_belly' ? voreBellyImages :
    category === 'pregnant_belly' ? bellyPictures :
    category === 'pregnancy' ? pregnantPictures :
    null;

  return source ? getRandomImage(source) : null;
}

module.exports = {
  getRandomBellyImage: () => getRandomImage(bellyPictures),
  getRandomVoreImage: () => getRandomImage(voreBellyImages),
  getRandomPregnantPicture: () => getRandomImage(pregnantPictures),
  getImageByTag,
  getImageByCategory,
};

// Mabye idea to add tage support to the pregnant picture.. Incase of well Small and Big belly elise or choose random at both