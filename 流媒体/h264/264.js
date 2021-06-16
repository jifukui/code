const fs = require("fs");
const transform = require("../util/Array2Bits")
// let raw;
fs.readFile("red.264",{},(err,data)=>{
    if(err){
        console.log("have get a error")
    }else{
        let raw = data.slice(0,4);
        let flag = Checkfile(raw);
        if(flag){
            console.log(`good data`)
        }else{
            console.log(`bad data`)
            return ;
        }
        data = data.slice(4)
        data = Array.from(data);
        data = transform.BitStream(data);
        flag = Fibbiden(data);
        if(!flag){
            console.log("good fibbden")
        }else{
            console.log("bad fidden")
            return 
        }
        Reference(data);
        Unittype(data);
        console.log(data)
    }
});
function Checkfile(val){
    let flag = val.readUInt32LE(0);
    return !!flag
}
function Fibbiden(val){
    let flag = transform.GetFloatRaw(val,1);
    return !!flag
}
function Reference(val){
    let data = transform.GetRawData(val,2);
    console.log(`the Reference is ${data}`)
    switch(data){
        case 0:{
            break;
        }
        case 1:{
            break;
        }
        case 2:{
            break;
        }
        case 3:{
            break;
        }
    }
}
function Unittype(val){
    let data = transform.GetRawData(val,5);
    let value;
    switch(data){
        case 0:{
            value = "未定义"
            break ;
        }
        case 1:{
            value = "非IDR图像中不采用数据划分的片段"
            break;
        }
        case 2:{
            value = "非IDR图像中A类数据划分片段"
            break;
        }
        case 3:{
            value = "非IDR图像中B类数据划分片段"
            break;
        }
        case 4:{
            value = "非IDR图像中C类数据划分片段"
            break;
        }
        case 5:{
            value = "IDR图像的片"
            break;
        }
        case 6:{
            value = "补充增强信息单元（SEI)";
            break;
        }
        case 7:{
            value = "序列参数集";
            SPSHandle(val);
            break;
        }
        case 8:{
            value = "图像参数集";
            break;
        }
        case 9:{
            value = "分界符";
            break;
        }
        case 10:{
            value = "序列结束";
            break;
        }
        case 11:{
            value = "码流结束";
            break;
        }
        case 12:{
            value = "填充";
            break;
        }
        case 24:{
            // value ="Single-time aggregation packet";
            // break;
        }
        case 25:{
            value ="Single-time aggregation packet";
            break;
        }
        case 26:{

        }
        case 27:{
            value ="Multi-time aggregation packet";
            break;
        }
        case 28:{
            
        }
        case 29:{
            value = "Fragmentation unit";
            break;
        }
        case 30:{

        }
        case 31:{
            value = "unfefine";
            break;
        }
        default :{
            value="default value"
        }
    }
    console.log(`the value is ${value}`);
    return data;
}
function SPSHandle(val){
    let data 
    let profile_idc = transform.GetRawData(val,8);
    console.log(`profile_idc is ${data}`);
    data = transform.GetRawData(val,1);
    console.log(`constraint_set0_flag is ${data}`);
    data = transform.GetRawData(val,1);
    console.log(`constraint_set1_flag is ${data}`);
    data = transform.GetRawData(val,1);
    console.log(`constraint_set2_flag is ${data}`);
    data = transform.GetRawData(val,1);
    console.log(`constraint_set3_flag is ${data}`);
    data = transform.GetRawData(val,4);
    console.log(`reserved_zero_4bits is ${data}`)
    if(data!=0){
        console.log(`have get error`)
        return ;
    }else{
        console.log(`good`)
    }
    let level_idc = transform.GetRawData(val,8);
    console.log(`level_idc is ${level_idc}`);
    data = transform.GetGolomb(val);
    console.log(`the seq_parameter_set_id is ${data}`);
    if(profile_idc==100||
        profile_idc==110||
        profile_idc==122||
        profile_idc==244||
        profile_idc==44||
        profile_idc==83||
        profile_idc==86||
        profile_idc==118||
        profile_idc==128||
        profile_idc==138||
        profile_idc==139||
        profile_idc==134||
        profile_idc==135)
        {
            let chroma_format_idc = transform.GetGolomb(val);
            console.log(`chroma_format_idc is ${chroma_format_idc}`);
            let data;
            switch(chroma_format_idc){
                case 0:{
                    data = "单色"
                    break;
                }
                case 1:{
                    data = "420";
                    break;
                }
                case 2:{
                    data ="422";
                    break;
                }
                case 3:{
                    data = "444";
                    break;
                }
            }
            console.log(`颜色空间${data}`)
            if(chroma_format_idc==3){
                data = transform.GetRawData(val,1);
                console.log(`separate_colour_plane_flag is ${data}`)
            }
            data = transform.GetGolomb(val);
            console.log(`bit_depth_luma_minus8 is ${data}`);
            data = transform.GetGolomb(val);
            console.log(`bit_depth_chroma_minus8 is ${data}`);
            data = transform.GetRawData(val,1);
            console.log(`qpprime_y_zero_transform_bypass_flag is ${data}`)
            let seq_scaling_matrix_present_flag = transform.GetRawData(val,1);
            console.log(`seq_scaling_matrix_present_flag is ${seq_scaling_matrix_present_flag}`)
            if(seq_scaling_matrix_present_flag){
                console.log(`this have nonot do it`)
            }
            data = transform.GetGolomb(val);
            console.log(`log2_max_frame_num_minus4 is ${data}`)
            let pic_order_cnt_type = transform.GetGolomb(val);
            console.log(`pic_order_cnt_type is ${pic_order_cnt_type}`)
            if(pic_order_cnt_type){
                console.log(`have not do it`)
            }else{
                data = transform.GetGolomb(val);
                console.log(`log2_max_pic_order_cnt_lsb_minus4 is ${data}`)
            }
            data = transform.GetGolomb(val);
            console.log(`max_num_ref_frames is ${data}`);
            data = transform.GetRawData(val,1);
            console.log(`gaps_in_frame_num_value_allowed_flag is ${data}`)
            data = transform.GetGolomb(val);
            console.log(`pic_width_in_mbs_minus1 is ${data}`)
            data = transform.GetGolomb(val);
            console.log(`pic_height_in_map_units_minus1 is ${data}`)
            let frame_mbs_only_flag = transform.GetRawData(val,1);
            console.log(`frame_mbs_only_flag is ${frame_mbs_only_flag}`);
            if(!frame_mbs_only_flag){
                data = transform.GetRawData(val,1);
                console.log(`mb_adaptive_frame_field_flag is ${data}`)
            }
            data = transform.GetRawData(val,1);
            console.log(`direct_8x8_inference_flag is ${data}`);
            let frame_cropping_flag = transform.GetRawData(val,1);
            console.log(`frame_cropping_flag is ${frame_cropping_flag}`);
            if(frame_cropping_flag){
                data = transform.GetGolomb(val);
                console.log(`frame_crop_left_offset is ${data}`);
                data = transform.GetGolomb(val);
                console.log(`frame_crop_right_offset is ${data}`);
                data = transform.GetGolomb(val);
                console.log(`frame_crop_top_offset is ${data}`);
                data = transform.GetGolomb(val);
                console.log(`frame_crop_bottom_offset is ${data}`);
            }
            let vui_parameters_present_flag = transform.GetRawData(val,1);
            console.log(`vui_parameters_present_flag is ${vui_parameters_present_flag}`)
            if(vui_parameters_present_flag){
                vui_parameters(val)
            }
    }
    rbsp_trailing_bits(val)
    // data = transform.GetGolomb(val);
    // console.log(`log2_max_frame_num_minus4 is ${data}`);
    // let pic_order_cnt_type = transform.GetGolomb(val);
    // console.log(`the pic_order_cnt_type is ${pic_order_cnt_type}`)
    // if(pic_order_cnt_type == 0){
    //     data = transform.GetGolomb(val);
    //     console.log(`log2_max_pic_order_cnt_lsb_minus4 is ${data}`)
    // }else if(pic_order_cnt_type == 1){
    //     data = transform.GetRawData(val,1);
    //     console.log(`delta_pic_order_always_zero_flag is ${data}`)
    //     data = transform.GetGolomb(val);
    //     console.log(`offset_for_non_ref_pic is ${data}`)
    // }
}
function vui_parameters(val){
    let data ;
    let aspect_ratio_info_present_flag =transform.GetRawData(val,1);
    console.log(`aspect_ratio_info_present_flag is ${aspect_ratio_info_present_flag}`);
    if(aspect_ratio_info_present_flag){

    }
    let overscan_info_present_flag = transform.GetRawData(val,1);
    console.log(`overscan_info_present_flag is ${overscan_info_present_flag}`)
    if(overscan_info_present_flag){

    }
    let video_signal_type_present_flag =transform.GetRawData(val,1)
    console.log(`video_signal_type_present_flag is ${video_signal_type_present_flag}`)
    let chroma_loc_info_present_flag = transform.GetRawData(val,1);
    console.log(`chroma_loc_info_present_flag is ${chroma_loc_info_present_flag}`);
    if(chroma_loc_info_present_flag){

    }
    let timing_info_present_flag = transform.GetRawData(val,1);
    console.log(`timing_info_present_flag is ${timing_info_present_flag}`)
    if(timing_info_present_flag){
        data = transform.GetRawData(val,32);
        console.log(`num_units_in_tick is ${data}`);
        data = transform.GetRawData(val,32);
        console.log(`time_scale is ${data}`)
        data = transform.GetRawData(val,1);
        console.log(`fixed_frame_rate_flag is ${data}`)
    }
    let nal_hrd_parameters_present_flag = transform.GetRawData(val,1);
    console.log(`nal_hrd_parameters_present_flag is ${nal_hrd_parameters_present_flag}`);
    if(nal_hrd_parameters_present_flag){

    }
    let vcl_hrd_parameters_present_flag = transform.GetRawData(val,1);
    console.log(`vcl_hrd_parameters_present_flag is ${vcl_hrd_parameters_present_flag}`)
    if( nal_hrd_parameters_present_flag || vcl_hrd_parameters_present_flag ){

    }
    data = transform.GetRawData(val,1);
    console.log(`pic_struct_present_flag is ${data}`)
    let bitstream_restriction_flag = transform.GetRawData(val,1);
    console.log(`bitstream_restriction_flag is ${bitstream_restriction_flag}`)
    if(bitstream_restriction_flag){

    }
}
function rbsp_trailing_bits(val){
    let data  = transform.GetRawData(val,1);
    console.log(`rbsp_stop_one_bit is ${data}`)
    if(!data){
        console.log(`have some error`);
        return ;
    }
}