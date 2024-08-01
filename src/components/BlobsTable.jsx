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
  
export function BlobsTable() {
    let invoices = [{},{}]

    return (
      <Table>
        <TableCaption>A list of your recent uploaded files.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Blob</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{'link'}</TableCell>
              <TableCell><Button><FaTrash/></Button></TableCell>
              <TableCell><Button><FaPen/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  