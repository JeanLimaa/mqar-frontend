import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const sensorDatas = [
    {
      createdAt: "11/10/2024",
      deviceName: "Sensor 1",
      temperature: "20°C",
      humidity: "50%",
      gasLevel: "Ruim (v100ppm)",
    },
    {
      createdAt: "11/10/2024",
      deviceName: "Sensor 1",
      temperature: "20°C",
      humidity: "50%",
      gasLevel: "Ruim (v100ppm)",
    },
    {
      createdAt: "11/10/2024",
      deviceName: "Sensor 1",
      temperature: "20°C",
      humidity: "50%",
      gasLevel: "Ruim (v100ppm)",
    },
  ]
  
  export function BaseTable() {
    return (
      <Table className="text-white">
        <TableCaption>Uma lista com os dados históricos dos seus sensores.</TableCaption>
        <TableHeader className="bg-slate-700" >
          <TableRow>
            <TableHead className="w-[200px]" style={{color: "white"}}>Data de Refêrencia</TableHead>
            <TableHead style={{color: "white"}}>Sensor de Refêrencia</TableHead>
            <TableHead style={{color: "white"}}>Temperatura</TableHead>
            <TableHead style={{color: "white"}}>Umidade do ar</TableHead>
            <TableHead className="text-right" style={{color: "white"}}>Qualidade do ar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-slate-600">
          {sensorDatas.map((sensorData, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{sensorData.createdAt}</TableCell>
              <TableCell>{sensorData.deviceName}</TableCell>
              <TableCell>{sensorData.temperature}</TableCell>
              <TableCell>{sensorData.humidity}</TableCell>
              <TableCell className="text-right">{sensorData.gasLevel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  