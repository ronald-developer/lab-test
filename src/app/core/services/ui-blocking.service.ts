import { CoreModule } from './../core.module';
import { Injectable } from "@angular/core";
import { BlockUIService } from "ng-block-ui";


export const NAVIGATION_BLOCKING_UI = "NAVIGATION_BLOCKING_UI";

@Injectable({
    providedIn: CoreModule
})
export class UiBlockingService {
    private nextNumber = 1;
    private activeBlocks: Array<number> = [];
    constructor(
        private blockUiService: BlockUIService
    ) {}

    public popBlock(id: number) {
        if (!id) {
            throw "popBlock requires a valid ID.";
        }

        const index = this.activeBlocks.findIndex((x) => x == id);
        if (index >= 0) {
            this.activeBlocks.splice(index, 1);
            this.update();
        }
        else {
            console.error(`Removing block that was not present anymore, ignoring action. ID was ${id}`);
        }
    }

    public pushBlock(): number {
        const id = this.nextNumber++;
        this.activeBlocks.push(id);
        this.update();
        return id;
    }

    private update() {
        if (this.activeBlocks.length === 0) {
            this.blockUiService.reset(NAVIGATION_BLOCKING_UI);
        } else if (!this.blockUiService.isActive(NAVIGATION_BLOCKING_UI)) {
            this.blockUiService.start(NAVIGATION_BLOCKING_UI);
        }
    }

    public blockById(id: string, message?:string[]){
        if (message){
            this.blockUiService.start(id, message);
        }
        else{
            this.blockUiService.start(id);
        }
    }

    public unblockById(id: string){
        this.blockUiService.stop(id);
    }
}
