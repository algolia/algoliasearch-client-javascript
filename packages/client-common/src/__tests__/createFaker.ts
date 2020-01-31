export function createFaker() {
  return {
    object(objectID?: string): Record<string, any> {
      let obj = {
        name: Math.random()
          .toString(36)
          .substring(2, 15),
        age: Math.floor(Math.random() * Math.floor(100)),
      };

      if (objectID !== undefined) {
        obj = Object.assign(obj, { objectID });
      }

      return obj;
    },

    objects(number: number): readonly object[] {
      const objects = [];

      for (let index = 0; index < number; index++) {
        objects.push(this.object(index.toString()));
      }

      return objects;
    },
  };
}
