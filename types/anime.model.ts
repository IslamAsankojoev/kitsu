interface IAnime {
  id: string,
  type: string,
  links: {
    self: string
  },
  attributes: {
    createdAt: string,
    updatedAt: string,
    slug: string,
    synopsis: string,
    coverImageTopOffset: number,
    titles: {
      en: string,
      en_jp: string,
      ja_jp: string
    },
    canonicalTitle: string,
    abbreviatedTitles: [
      string
    ],
    averageRating: string,
    userCount: number,
    favoritesCount: number,
    startDate: string,
    endDate: string,
    popularityRank: number,
    ratingRank: number,
    ageRating: string,
    ageRatingGuide: string,
    subtype: string,
    status: string,
    tba: string,
    posterImage: {
      tiny: string
      small: string,
      medium: string,
      large: string,
      original: string,
      meta: {
        dimensions: {
          tiny: {
            width: null,
            height: null
          },
          small: {
            width: null,
            height: null
          },
          medium: {
            width: null,
            height: null
          },
          large: {
            width: null,
            height: null
          }
        }
      }
    },
    coverImage: {
      tiny: string
      small: string,
      large: string,
      original: string,
      meta: {
        dimensions: {
          tiny: {
            width: null,
            height: null
          },
          small: {
            width: null,
            height: null
          },
          large: {
            width: null,
            height: null
          }
        }
      }
    },
    episodeCount: 26,
    episodeLength: 25,
    youtubeVideoId: string,
    showType: string,
    nsfw: false
  },
}