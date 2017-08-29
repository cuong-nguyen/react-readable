export const updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues)
}

export const updateItemInArray = (array, id, updateItemCallback) => {
  const updatedItems = array.map(item => {
    if (item.id !== id) {
      return item
    }

    return updateItemCallback(item)
  })

  return updatedItems
}
