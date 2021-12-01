import { Controller, useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import { searchPhotos } from "../__generated__/searchPhotos";
import { SEARCH_PHOTOS } from "../queries";
import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
