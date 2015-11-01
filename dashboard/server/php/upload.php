<?php

$data = array();
 
    $error = false;
    $files = array();

    $uploaddir = '../assets/images/';
    $returndir = 'server/assets/images/';
    foreach($_FILES as $file)
    {
        if(move_uploaded_file($file['tmp_name'], $uploaddir .basename($file['name'])))
        {
            $files[] = $returndir .$file['name'];
        }
        else
        {
            $error = true;
        }
    }

    $data = ($error) ? array('error' => 'There was an error uploading your files') : array('files' => $files);

echo json_encode($data);

?>
