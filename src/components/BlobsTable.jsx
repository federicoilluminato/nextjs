'use client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { FaPen, FaTrash} from "react-icons/fa";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { Skeleton } from "./Skeleton";
  
export function BlobsTable({data, setBlob, fetchBlobs, loading}) {
    const [modal, setModal] = useState(null);
    const [edit, setEdit] = useState(null);

    const handleDelete = async (url) =>{
        try{
            const response = await fetch('api/delete-blob?url='+encodeURIComponent(url),{
                method: 'DELETE'
            });
            const result = await response.json();
            console.log('delete response', result)
            if (result.success) {
                fetchBlobs();
            }
        }catch(error){
            setModal(`error getblobs: ${error}`);
        }
    }

    const handleEdit = (data) =>{
        setModal(true)
        setEdit(data)
    }

    return (
        <>
            {loading ? (
                <Skeleton />
            ) : (
                <>
                    <Table>
                        <TableCaption>A list of your recent uploaded files.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">Blob</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">
                                        <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer">
                                            {item.pathname}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="destructive" onClick={() => handleDelete(item.downloadUrl)}>
                                            <FaTrash />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(item)}>
                                            <FaPen />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {modal && <Modal setError={setModal} error={modal} edit={edit} />}
                </>
            )}
        </>
    );
  }
  