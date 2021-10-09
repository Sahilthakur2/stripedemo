function MatchUser() {
    const user = firebase.auth().currentUser;
    let promises = [];

    const subscriber = firestore()
      .collection('Cards')
      .where("Toid", "==", user.uid)
      .get()
      .then(querySnapshot => {
        const users1 = [];
        querySnapshot.forEach(documentSnapshot => {
          let data = documentSnapshot.data()
          promises.push(firestore()
            .collection('Users').doc(data.uid).get())
          users1.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        Promise.all(promises).then(values => {
          let index = 0
          users1.forEach(item => {
            let val = values[index]
            if (val.data() != null) {
              item.imgUrl = val.data().ImagePath
            }
            index = index + 1
          })
          setUsers1(users1);
          setLoading(false);
        });

      });


    return () => subscriber();
  }