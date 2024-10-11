import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { FilterSelect } from "../select"
import { BaseTable } from "../table"

export function TabsBase() {
    return (
        <Tabs defaultValue="historico" > {/* className="w-[200px]" */}
            <TabsList className="grid w-full grid-cols-2 mb-9">
                <TabsTrigger 
                    value="historico" 
                    className="bg-white text-slate-700 data-[state=active]:bg-slate-400 data-[state=active]:text-white rounded-sm py-2"
                >
                    Historico
                </TabsTrigger>
                <TabsTrigger 
                    value="graficos" 
                    className="bg-white text-slate-700 data-[state=active]:bg-slate-400 data-[state=active]:text-white rounded-sm py-2"
                >
                    Gráficos
                </TabsTrigger>
            </TabsList>
            <TabsContent className="min-w-full" value="historico">
                <div>
                    <FilterSelect />
                    <BaseTable />
                </div>
            </TabsContent>
            <TabsContent value="graficos">
                <div>ousada</div>
            </TabsContent>
        </Tabs>
    )
}