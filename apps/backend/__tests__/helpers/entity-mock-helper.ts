export class EntityMockHelper {
  /**
   * Преобразует plain объект в экземпляр указанного класса
   */
  static asEntity<T extends {}>(EntityClass: new () => T, data: Partial<T>): T {
    const instance = new EntityClass();
    Object.assign(instance, data);
    return instance;
  }

  /**
   * Преобразует массив plain объектов в массив экземпляров
   */
  static asEntityArray<T extends {}>(entityClass: new () => T, dataArray: Partial<T>[]): T[] {
    return dataArray.map(data => this.asEntity(entityClass, data));
  }

  /**
   * Создает мок репозитория с правильными типами
   */
  static createMockRepository<T extends {}>(entityClass: new () => T) {
    return {
      find: jest.fn().mockImplementation(async (): Promise<T[]> => []),
      findOne: jest.fn().mockImplementation(async (): Promise<T | null> => null),
      save: jest.fn().mockImplementation(async (entity: any): Promise<T> => {
        if (Array.isArray(entity)) {
          return entity.map(e => this.asEntity(entityClass, e)) as any;
        }
        return this.asEntity(entityClass, entity) as any;
      }),
    };
  }
}