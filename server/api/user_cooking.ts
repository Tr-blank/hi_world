export default async () => {
  // console.log(req)
  // let user_id = null
  let userData = {
    user_id: '1',
    user_name: '提亞',
    cooking: {
      recipe_list: [
        {
          id: 1,
          name: '燙青菜',
          item_all: [],
          ingredients_all: [
            {
              id: 2,
              type: 'ingredients_group',
              name: '青菜類',
              count: 1
            },
            {
              id: 1,
              type: 'ingredients',
              name: '水',
              count: 1000
            }
          ],
          steps: [{
            method: { id: '3', name: '煮沸' },
            duration_time: 10000,
            ingredients: [
              {
                id: 2,
                type: 'ingredients_group',
                name: '青菜類',
                count: 1
              },
              {
                id: 1,
                type: 'ingredients',
                name: '水',
                count: 1000
              }
            ]
          }]
        }
      ],
      storehouse : [
        {
          item_id: 1,
          type: 'ingredients',
          name: '水',
          count: 10000
        },
        {
          item_id: 2,
          type: 'ingredients',
          name: '高麗菜(份)',
          count: 50
        }
      ]
    }
  }
  // if (req.url.includes('id')) return { status: 400, message: '無此使用者' }
  // const urlQuery = req.url.slice(1)
  // const query = urlQuery.split('&')
  // for (let i = 0; i < query.length; i++) {
  //   const queryItem = query[i].split('=')
  //   if (queryItem[0] === 'id') {
  //     user_id = queryItem[1]
  //     userData = {
  //       user_id: '1',
  //       user_name: '提亞',
  //       cooking: {
  //         recipe_list: [
  //           {
  //             id: 1,
  //             name: '燙青菜',
  //             steps: [{
  //               method_id: 3,
  //               duration_time: 10000,
  //               ingredients: [
  //                 {
  //                   id: 2,
  //                   type: 'ingredients_group',
  //                   name: '青菜類',
  //                   count: 1
  //                 },
  //                 {
  //                   id: 1,
  //                   type: 'ingredients',
  //                   name: '水',
  //                   count: 1000
  //                 }
  //               ]
  //             }]
  //           }
  //         ],
  //         storehouse : [
  //           {
  //             item_id: 1,
  //             type: 'ingredients',
  //             name: '水',
  //             count: 10000
  //           },
  //           {
  //             item_id: 2,
  //             type: 'ingredients',
  //             name: '高麗菜(份)',
  //             count: 50
  //           }
  //         ]
  //       }
  //     }
  //   } else {
  //     return
  //   }
  // }

  return {
    status: 200,
    data: {
      recipe_list: userData.cooking.recipe_list,
      storehouse: userData.cooking.storehouse
    }
  }
}
