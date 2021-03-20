import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";

import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Checkbox,
  Text,
  Button,
} from "@chakra-ui/react";
import {
  GrFacebook,
  GrGoogle,
  GrFormViewHide,
  GrFormView,
} from "react-icons/gr";
import useValidation from "../../hooks/useValidation";
import loginValidator from "../../utils/validators/loginValidator";
import { LoginErrors } from "../../interfaces";

interface Props {}

export default function SigninRight({}: Props): ReactElement {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [loginSuccess, setloginSuccess] = useState(false);

  const initialState = {
    email: "",
    password: "",
  };

  const loginUser = async () => {
    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.code === 200) {
        signIn("credentials", {
          callbackUrl: window.location.origin,
          email: values.email,
          password: values.password,
        });
      }
      if (data.code !== 200) {
        setApiError(data?.error);
        setloginSuccess(false);
        return;
      }

      setApiError(null);
      setloginSuccess(true);
    } catch (error) {
      setApiError(error.error);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useValidation(
    initialState,
    loginValidator,
    loginUser
  );
  const { email, password } = values;

  const handleClick = () => setShow(!show);

  return (
    <Box w={{ sm: "100%", md: "45%" }} flexDirection="column">
      <Box width="100%" py={{ sm: "1rem", md: "1rem" }} px={{ md: "2rem" }}>
        <form onSubmit={handleSubmit}>
          <Box d="flex" alignItems="center" flexDir="column">
            <Input
              w={{ sm: "70%", md: "100%" }}
              variant="filled"
              bg="E9EFF6"
              fontSize={{ sm: "16px", md: "18px" }}
              h={{ sm: "3rem", md: "3.5rem" }}
              filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
              placeholder="Correo electronico"
              name="email"
              values={email}
              onChange={handleChange}
            />
            {(errors as LoginErrors).email && (
              <Text mt="3px" color="red">
                {(errors as LoginErrors).email}
              </Text>
            )}
            <InputGroup
              w={{ sm: "70%", md: "100%" }}
              d="flex"
              alignItems="center"
              flexDir="column"
            >
              <Input
                w="100%"
                variant="filled"
                bg="E9EFF6"
                fontSize={{ sm: "16px", md: "18px" }}
                h={{ sm: "3rem", md: "3.5rem" }}
                mt="1em"
                placeholder="Password"
                type={show ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
              />
              <InputRightElement
                w="3.5em"
                top={{ sm: "20px", md: "1.5rem" }}
                pr="1rem"
                color="#85898D"
                onClick={handleClick}
                children={
                  show ? (
                    <GrFormViewHide size="large" />
                  ) : (
                    <GrFormView size="large" color="#85898D" />
                  )
                }
              />
            </InputGroup>
            {(errors as LoginErrors).password && (
              <Text mt={{ sm: "2px" }} color="red">
                {(errors as LoginErrors).password}
              </Text>
            )}
          </Box>
          <Box
            w="100%"
            d="flex"
            justifyContent="space-evenly"
            alignItems="center"
            mt="2em"
          >
            <Text
              w={{ sm: "10rem" }}
              fontSize={{ sm: "14px", md: "16px" }}
              onClick={() => router.push("/recover-password")}
              color="#85898D"
              _hover={{
                cursor: "pointer",
                color: "#545759",
              }}
            >
              ¿Olvidaste tu contraseña?
            </Text>
            <Box w={{ sm: "10rem" }}>
              <Checkbox
                fontSize={{ sm: "14px", md: "16px" }}
                textAlign="center"
                color="#85898D"
              >
                <Text fontSize={{ sm: "14px", md: "16px" }}>
                  Mantenerme conectado
                </Text>
              </Checkbox>
            </Box>
          </Box>
          <Box d="flex" justifyContent="center" mt="1.5em">
            {apiError && (
              <Text textAlign="center" color="red">
                {apiError}
              </Text>
            )}

            {loginSuccess && (
              <Text textAlign="center" color="green">
                Login successful!
              </Text>
            )}

            <Button
              w="15rem"
              height="3.5rem"
              borderRadius="10px"
              p={{ sm: "10px", md: "1.5rem" }}
              bg="btn.400"
              fontWeight="bold"
              fontSize={{ sm: "18px", md: "20px" }}
              _hover={{
                background: "btn.300",
                color: "#fafafa",
              }}
              color="#fff"
              type="submit"
            >
              Ingresar
            </Button>
          </Box>
          <Box mt="1.5em">
            <Text
              fontSize={{ sm: "14px", md: "16px" }}
              padding={{ sm: "10px" }}
              textAlign="center"
              color="#85898D"
              justifySelf="center"
            >
              O continua con:
            </Text>
          </Box>
          <Box d="flex" justifyContent="space-evenly" mt="1.5rem">
            <Box
              w={{ sm: "50px", lg: "80px" }}
              h={{ sm: "50px", lg: "80px" }}
              p={{ sm: "10px", lg: "1.5rem" }}
              bg="white"
              cursor="pointer"
              borderRadius={{ sm: "5px", lg: "7px" }}
              filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
              onClick={() => signIn("google")}
            >
              <GrGoogle size="small" />
            </Box>
            <Box
              w={{ sm: "50px", lg: "80px" }}
              h={{ sm: "50px", lg: "80px" }}
              p={{ sm: "10px", lg: "1.5rem" }}
              bg="white"
              cursor="pointer"
              borderRadius={{ sm: "5px", lg: "7px" }}
              filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
              onClick={() => signIn("facebook")}
            >
              <GrFacebook size="small" />
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
