export interface SliderModel {
    slider_id: number;
    slider_image: string;
    slider_title: string;
    status:number;
}
export interface SliderState {
    slider: SliderModel[];
    error: string | undefined;
}