import { useState, useEffect } from "react"
import { api } from "../../lib/api"

interface UsuarioGet {
    id: String,
    email: String
}
export const Usuarios = () => {
    const [usuarios, setUsuarios] = useState<UsuarioGet[]>([])
    useEffect(() => {

        api.get("/user").then(res => {
            console.log(res);
            
        })
    }, [])
    return (
        <div>
            <table>
                <thead>
                    <td>
                        Email
                    </td>
                    <td>
                        Ações
                    </td>
                </thead>
                <tbody>
                    {
                        usuarios.map(usuario => <tr>
                            <td>
                                {
                                    usuario.email
                                }
                            </td>
                            <td>
                                {usuario.id}
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}