import {render, screen, userEvent} from "@testing-library/react"
import App from "./App"
import Menu from "./CommonParts/Menu";
import LoginUser from "./User/LoginUser";
import { Route, Routes, useHref } from "react-router-dom"
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import {CookiesProvider}  from "react-cookie"
import { ChakraProvider } from '@chakra-ui/react'
 let list =["home", "casa"]
test('full app rendering/navigating', async () => {
    render(
        <CookiesProvider>
            <ChakraProvider>
                <LoginUser />
            </ChakraProvider>
        </CookiesProvider>
    , {wrapper: BrowserRouter})
    const user = userEvent.setup()
  
    // verify page content for default route
    expect(screen.getByText(/Login/i)).toBeInTheDocument()
  
    // verify page content for expected route after navigating
    //await user.click(screen.getByText(/about/i))
    //expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
  })


  describe("Test 2", ()=>{
    it("list render", ()=>{
        render( <App list={list} />)
        expect(screen.getByRole("list")).toBeInTheDocument()
        
    })
  })

