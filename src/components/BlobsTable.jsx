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
import { useState } from "react";
  
export function BlobsTable({data}) {
    const [modal, setModal] = useState(null); 

    const handleDelete = async (url) =>{
        try{
            const response = await fetch('api/delete-blob?url='+encodeURIComponent(url),{
                method: 'DELETE'
            });
            const data = await response.json();
            console.log('delete response', data)
        }catch(error){
            setModal(`error getblobs: ${response.status}`);
        }
    }

    return (
      <Table>
        <TableCaption>A list of your recent uploaded files.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Blob</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((data, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium"><a href={data.downloadUrl} target="_blank" rel="noopener noreferrer">{data.downloadUrl}</a></TableCell>
              <TableCell><Button variant="destructive" onClick={()=>handleDelete(data.downlaodUrl)}><FaTrash/></Button></TableCell>
              <TableCell><Button><FaPen/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  