#!/bin/bash
echo "执行文件的文件路径为:$0"
output()
{
	echo "吉富逵在进行测试"
}
outputall()
{
	i=0;
	echo "开始进行输出$i,$#"
	while(($i <= $#))
	do
		echo "The data $i is ${!i}"
		let "i++"
	done
}
relative_path() {
    local base="${PWD%/}"
	echo "local is $base"
    local path="$(cd "$1" >/dev/null; printf '%s/.' "${PWD%/}")"
    local up=''

    while [[ $path != "$base/"* ]]; do
        base="${base%/*}"
        up="../$up"
    done

    dirname "$up${path#"$base/"}"
}
echo "传入的参数的数量为:$#"
output 
outputall $@
echo "第一个参数是$2"
SRCPATH="$(relative_path "$(dirname "$0")")"
echo "dirnamejifukui is $SRCPATH"
