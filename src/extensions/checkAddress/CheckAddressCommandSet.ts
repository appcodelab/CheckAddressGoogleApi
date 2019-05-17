import { override } from '@microsoft/decorators';
import pnp, { SearchResults } from 'sp-pnp-js';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
import * as googleMaps from '@google/maps'
import * as strings from 'CheckAddressCommandSetStrings';
const keySstring: string ='GoogleKey';
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICheckAddressCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'CheckAddressCommandSet';

export default class CheckAddressCommandSet extends BaseListViewCommandSet<ICheckAddressCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized CheckAddressCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1':
        const googleMapsClient = googleMaps.createClient({ // create google Maps Client
          key: keySstring, // Google API Key, get by Google Cloud 
          Promise: Promise
        });
        debugger;                          
        // Geocode an address.
        googleMapsClient.geocode({address: "Lorenzstraße 19, Karlsruhe, 76135" // Address string for the check
        }, function(err, response) {
          if (!err) {
            if(response.json.status = 1) // if Status OK 
            {
                const result   = response.json.results[0];
                var resultString: string = result.formatted_address;   // get Formated Address 
                Dialog.alert(resultString);                
            }                                           
          }
      });       
        break;
        default:
          throw new Error('Unknown command'); 
    }
  }
}
