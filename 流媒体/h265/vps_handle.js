const translate = require("../util/Array2Bits");
const data=[
    0x0c,0x01,0xff,0xff,
    0x01,0x60,0x00,0x00,
    0x03,0x00,0xb0,0x00,
    0x00,0x03,0x00,0x00,
    0x03,0x00,0x7b,0xac,
    0x09,
];
// const data = [0x2];
function H265_VPS_Handle(data){
    let val;
    val = translate.BitStream(data);
    // val={index:0,data:"00100"}
    let id;
    id = translate.GetData(val,4);
    console.log(`vps_video_parameter_set_id ${id}`);
    id = translate.GetData(val,1);
    console.log(`vps_base_layer_internal_flag ${id}`);
    id = translate.GetData(val,1);
    console.log(`vps_base_layer_available_flag ${id}`);
    id = translate.GetData(val,6);
    console.log(`vps_max_layers_minus1 ${id}`);
    id = translate.GetData(val,3);
    let vps_max_sub_layers_minus1 = id;
    console.log(`vps_max_sub_layers_minus1 ${id}`);
    id = translate.GetData(val,1);
    console.log(`vps_temporal_id_nesting_flag ${id}`);
    id = translate.GetData(val,16);
    console.log(`vps_reserved_0xffff_16bits ${id}`);
    id = translate.GetData(val,1);
    console.log(`vps_sub_layer_ordering_info_present_flag ${1}`);
    for(let i=id?0:vps_max_sub_layers_minus1;i<=vps_max_sub_layers_minus1;i++){
        id = translate.GetGolomb(val);
        console.log(`vps_max_dec_pic_buffering_minus1 ${i} is ${id}`);
        id = translate.GetGolomb(val);
        console.log(`vps_max_num_reorder_pics ${i} is ${id}`);
        id = translate.GetGolomb(val);
        console.log(`vps_max_latency_increase_plus1 ${i} is ${id}`);  
    }
    let vps_max_layer_id = translate.GetData(val,6);
    console.log(`vps_max_layer_id ${vps_max_layer_id}`);
    let vps_num_layer_sets_minus1 = translate.GetGolomb(val);
    console.log(`vps_num_layer_sets_minus1 ${vps_num_layer_sets_minus1}`);
    for(let i = 1;i<=vps_num_layer_sets_minus1;i++){
        for(let n = 0;n<=vps_max_layer_id;n++){
            id = translate.GetData(val,1);
            console.log(`layer_id_included_flag ${i}${n} ${id}`)
        }
    }
    let vps_timing_info_present_flag = translate.GetData(val,1);
    console.log(`the vps_timing_info_present_flag ${vps_timing_info_present_flag}`)
    if(vps_timing_info_present_flag){

    }
    let vps_extension_flag = translate.GetData(val,1);
    console.log(`vps_extension_flag is ${vps_extension_flag}`);
    if(vps_extension_flag){

    }
    rbsp_trailing_bits(val)
    console.dir(val);
    console.log(`the other data is ${val.data.substr(val.index)}`)
}
function rbsp_trailing_bits(val){
    let id = translate.GetFloatRaw(val,1);
    console.log(`the id is ${id}`)
    if(id){
        while(val.index%8!=7){
            id = translate.GetFloatRaw(val,1);
            console.log(`the id is ${id}`)
            if(id){
                console.log("have error");
                break;
            }
        }
    }else{
        console.log("not tail")
    }
}
H265_VPS_Handle(data);