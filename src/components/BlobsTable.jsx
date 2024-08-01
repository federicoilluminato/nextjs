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
  
export function BlobsTable({data}) {

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
              <TableCell><Button><FaTrash/></Button></TableCell>
              <TableCell><Button><FaPen/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  