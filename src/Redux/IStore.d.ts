// #region Interface Imports
import { IHomePage, IBusiness, IOrder } from "@Interfaces";
// #endregion Interface Imports

export interface IStore {
    order: IOrder.IStateProps;
    business: IBusiness.IStateProps;
    home: IHomePage.IStateProps;
}
