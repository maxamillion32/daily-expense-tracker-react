const getDocData = (doc) => {
  return {id: doc.id, ...doc.data()};
};

export const getCollectionData = (collection) => {
  return collection.docs.map(getDocData);
};

export const deleteDocByCollection = (items, collection, deleteDoc, doc, db) => {
  return items.forEach(async(item) => {
    await deleteDoc(doc(db, collection, item.id));
  });
};
