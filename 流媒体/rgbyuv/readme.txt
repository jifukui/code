ffplay 播放yuv文件

ffmpeg -i 7f1d5b54.bmp -pix_fmt rgb24 guan.yuv
ffplay -video_size 128x128 -pixel_format rgb24 lena_4.yuv