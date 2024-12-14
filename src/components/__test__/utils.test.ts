import { stripOutAppwriteMetaData } from "@/utils"
import { it } from "node:test"

it("should strip out meta data",()=>{
    const data = {$id: "", others:""}
    expect(stripOutAppwriteMetaData(data)).toEqual({others:""})
})
