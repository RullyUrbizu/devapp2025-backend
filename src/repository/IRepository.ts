export interface IRepository<TEntity> {
    all(): Promise<TEntity[]>;
    get(id: string): Promise<TEntity>;
    save(entity: TEntity): Promise<TEntity>;
    delete(id: string): Promise<boolean>;
}
