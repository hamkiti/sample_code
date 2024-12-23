<?php
//商品データ一覧取得
require_once(dirname(dirname(__FILE__)) . '/include/config.php');
$csvFilePath = dirname(dirname(__FILE__)).'/file/sound_list.csv';

$listData = array();
if(file_exists($csvFilePath)){
	$csvfile = new SplFileObject($csvFilePath);
	$csvfile->setFlags(SplFileObject::READ_CSV);
	$arrCsvColName = array();
	$arrCsvRowData = array();
	foreach ($csvfile as $row){
		if($n > 0){
			$arrCsvRowData[] = $row;
		} else {
			//列キー取得
			$arrCsvColName = $row;
		}
		$n++;
	}
	
	if(count($arrCsvRowData) > 0){
		foreach ($arrCsvRowData as $rowData){
			$arr = array();
			if(isset($rowData[0])){
				foreach ($arrCsvColName as $colIndex => $colName){
					$arr[$colName] = isset($rowData[$colIndex]) ? $rowData[$colIndex]:null;
				}
				$listData[$rowData[0]] = $arr;
				
				
			}
		}
	}
}

$jsonData = array(
	'list' => $listData
);
echo json_encode($jsonData);
